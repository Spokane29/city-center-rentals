#!/bin/bash
# List all Supabase projects with their reference IDs
# Highlights the currently linked project

echo "📋 Supabase Projects:"
echo ""
supabase projects list 2>&1 | head -20

echo ""
echo "💡 To switch MCP to a project, use:"
echo "   export SUPABASE_PROJECT_REF=<project-ref>"
echo "   Then restart your MCP server"
echo ""
echo "   Or use: source switch-supabase-project.sh (in a linked project directory)"

