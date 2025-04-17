#!/bin/bash

# Set the root directory to the project root
ROOT_DIR="$(dirname "$(dirname "$(realpath "$0")")")"
echo "Searching for empty folders in: $ROOT_DIR"

# Find all empty directories (excluding node_modules and hidden folders)
echo "Finding empty folders..."
EMPTY_FOLDERS=$(find "$ROOT_DIR" -type d -empty -not -path "*/node_modules/*" -not -path "*/\.*")

# Check if any empty folders were found
if [ -z "$EMPTY_FOLDERS" ]; then
  echo "No empty folders found."
  exit 0
fi

# Display all empty folders that will be deleted
echo "The following empty folders will be deleted:"
echo "$EMPTY_FOLDERS" | while read -r folder; do
  echo "  - $folder"
done

# Prompt for confirmation
read -p "Do you want to delete these folders? (y/n): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
  echo "Operation cancelled."
  exit 1
fi

# Delete the empty folders
echo "Deleting empty folders..."
echo "$EMPTY_FOLDERS" | while read -r folder; do
  rmdir "$folder"
  echo "Deleted: $folder"
done

echo "All empty folders have been deleted."
