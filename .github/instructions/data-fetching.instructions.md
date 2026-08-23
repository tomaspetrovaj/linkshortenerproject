---
description: Read this file to understand how to fetch data in the project.
---
# Data Fetching Instructions
This document provides guidelines on how to fetch data in the project. Follow these instructions to ensure consistency and efficiency in data retrieval.

## 1. Use server components for data fetching
ALWAYS use server components to fetch data. NEVER use client components for data fetching.

## 2. Data Fetching Methods
ALWAYS use the helper functions in the /data folder to fetch data. NEVER use the fetch API directly in your components.

ALL helper functions in the /data folder should use Drizzle ORM for database interactions.
