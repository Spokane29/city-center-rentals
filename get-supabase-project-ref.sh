#!/bin/bash
# Quick script to get the current directory's Supabase project reference
# Usage: ./get-supabase-project-ref.sh

CURRENT_DIR=$(pwd)

# Try multiple methods to get project ref
PROJECT_REF=""

# Method 1: Check .supabase/project-ref
if [ -f ".supabase/project-ref" ]; then
    PROJECT_REF=$(cat .supabase/project-ref 2>/dev/null)
fi

# Method 2: Get from Supabase CLI status (macOS compatible)
if [ -z "$PROJECT_REF" ]; then
    PROJECT_REF=$(supabase status 2>/dev/null | grep -i "project" | grep -oE '[a-z]{20}' | head -1 || echo "")
fi

# Method 3: Get from linked projects list
if [ -z "$PROJECT_REF" ]; then
    PROJECT_REF=$(supabase projects list 2>&1 | grep -E "●" | awk -F'|' '{
        gsub(/^[ \t]+|[ \t]+$/, "", $3)
        if (length($3) == 20 && $3 ~ /^[a-z]+$/) {
            print $3
            exit
        }
    }' | head -1)
fi

if [ -n "$PROJECT_REF" ]; then
    echo "$PROJECT_REF"
    exit 0
else
    echo "No linked project found in: $CURRENT_DIR" >&2
    exit 1
fi

