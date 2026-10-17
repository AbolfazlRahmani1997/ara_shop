package schema

import "embed"

// Files contains SQL migrations embedded for golang-migrate.
//
//go:embed migrations/*.sql
var Files embed.FS
