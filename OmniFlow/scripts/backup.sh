#!/bin/bash
# scheduled via cron, e.g., 0 2 * * * /opt/omniflow/scripts/backup.sh
export PGPASSWORD=omniflow_secret
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_DIR="/var/backups/omniflow/$TIMESTAMP"

mkdir -p "$BACKUP_DIR"

echo "Backing up PostgreSQL database..."
docker exec omniflow-postgres pg_dump -U omniflow omniflow_dev > "$BACKUP_DIR/db.sql"

echo "Compressing backup..."
tar -czf "$BACKUP_DIR.tar.gz" -C "/var/backups/omniflow" "$TIMESTAMP"
rm -rf "$BACKUP_DIR"

echo "Syncing backup to MinIO (S3)..."
# requires mc (MinIO Client) configured with alias 'myminio'
mc cp "$BACKUP_DIR.tar.gz" myminio/backups/

echo "Backup $TIMESTAMP completed successfully."
