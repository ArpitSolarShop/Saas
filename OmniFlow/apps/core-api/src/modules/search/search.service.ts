import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MeiliSearch } from 'meilisearch';

@Injectable()
export class SearchService implements OnModuleInit {
    private client: MeiliSearch;
    private readonly logger = new Logger(SearchService.name);

    constructor(private configService: ConfigService) {
        this.client = new MeiliSearch({
            host: this.configService.get('MEILI_HOST', 'http://localhost:7700'),
            apiKey: this.configService.get('MEILI_MASTER_KEY', 'omniflow_meili_master_key'),
        });
    }

    async onModuleInit() {
        try {
            await this.client.health();
            this.logger.log('✅ Connected to Meilisearch');
            await this.setupIndexes();
        } catch (e) {
            this.logger.error('❌ Failed to connect to Meilisearch', e);
        }
    }

    private async setupIndexes() {
        const indexes = ['contacts', 'companies', 'leads', 'deals'];
        for (const index of indexes) {
            await this.client.createIndex(index, { primaryKey: 'id' }).catch(() => { });
            // Setup generic search attributes
            await this.client.index(index).updateSearchableAttributes(['name', 'title', 'email', 'phone', 'description']);
            await this.client.index(index).updateFilterableAttributes(['workspaceId', 'status', 'priority']);
        }
    }

    async addDocuments(index: string, documents: any[]) {
        return this.client.index(index).addDocuments(documents);
    }

    async search(index: string, query: string, workspaceId: string) {
        return this.client.index(index).search(query, {
            filter: [`workspaceId = ${workspaceId}`],
        });
    }
}
