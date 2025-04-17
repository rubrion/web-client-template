#!/bin/bash

# Set the root directory to the project root
ROOT_DIR="$(dirname "$(dirname "$(realpath "$0")")")"
echo "Searching for empty files in: $ROOT_DIR"

# Find all empty files
echo "Finding empty files..."
EMPTY_FILES=$(find "$ROOT_DIR" -type f -size 0 -not -path "*/node_modules/*" -not -path "*/\.*")

# Check if any empty files were found
if [ -z "$EMPTY_FILES" ]; then
  echo "No empty files found."
  exit 0
fi

# Display all empty files that will be deleted
echo "The following empty files will be deleted:"
echo "$EMPTY_FILES" | while read -r file; do
  echo "  - $file"
done

# Prompt for confirmation
read -p "Do you want to delete these files? (y/n): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
  echo "Operation cancelled."
  exit 1
fi

# Delete the empty files
echo "Deleting empty files..."
echo "$EMPTY_FILES" | while read -r file; do
  rm "$file"
  echo "Deleted: $file"
done

echo "All empty files have been deleted."
