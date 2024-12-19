#!/usr/bin/env bash
set -e
bun migrate
bun run serve
