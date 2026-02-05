


----------


# ⚡ Laravel Artisan Cheat Sheet (Enterprise Edition)

Laravel’s real power is **Artisan**.  
If you know the right commands, you can move **2–3× faster** than most developers.

This is a **practical, no-fluff list** you’ll actually use in real projects — optimized for **modern, enterprise Laravel** with **Server-Driven Architecture + Client-Side Rendering (CSR)**.



## 🚀 Project & Setup (First 10 Minutes)

Create a new Laravel project:

```bash
laravel new app-name
# or
composer create-project laravel/laravel app-name

```

Run the dev server:

```bash
php artisan serve

```

Clear all caches (run this often):

```bash
php artisan optimize:clear

```

✅ **Enterprise tip:** Run this after pulling branches, env changes, or config updates.

----------

## 🧱 Models, Migrations, Factories (Use Flags)

**One command. Everything created.**

```bash
php artisan make:model Product -mfs

```

### Common Flags

-   `-m` → migration
    
-   `-f` → factory
    
-   `-s` → seeder
    
-   `-c` → controller
    

💡 This single habit saves **hours** over the lifetime of a project.

----------

## 🎮 Controllers

Standard controller:

```bash
php artisan make:controller ProductController

```

API-only controller (clean, no views):

```bash
php artisan make:controller Api/ProductController --api

```

Resource controller (CRUD-ready):

```bash
php artisan make:controller ProductController --resource

```

✅ **Best practice:**  
Use **resource controllers** for server-driven APIs and let the frontend consume JSON only.

----------

## 🛣 Routes & Middleware

Create middleware:

```bash
php artisan make:middleware AdminMiddleware

```

Use middleware for:

-   Role checks
    
-   Feature flags
    
-   Request context (tenant, locale, permissions)
    

❌ Avoid role logic inside controllers.

----------

## 🔐 Auth & Security (Modern Stack)

### React + Breeze Starter Kit

```bash
php artisan breeze:install react
php artisan migrate
npm install && npm run dev

```

This gives you:

-   Session-based auth (secure, scalable)
    
-   CSRF protection
    
-   Clean React frontend
    

### Session Table (Common Gotcha)

```bash
php artisan session:table
php artisan migrate

```

✅ **Enterprise rule:**  
Stick to **one auth flow** unless there’s a strong reason not to.

----------

## 🧠 Form Requests (Clean Controllers)

```bash
php artisan make:request StoreProductRequest
php artisan make:request UpdateProductRequest

```

Why this matters:

-   Controllers stay thin
    
-   Validation is reusable
    
-   Easier testing
    
-   Cleaner diffs in PRs
    

----------

## 🗃 Database Power Tools

Seeder:

```bash
php artisan make:seeder ProductSeeder

```

Factory:

```bash
php artisan make:factory ProductFactory --model=Product

```

Fresh reset (⚠ dev only):

```bash
php artisan migrate:fresh --seed

```

✅ **Enterprise workflow:**  
Factories + seeders = predictable environments for teams.

----------

## 🧩 Authorization (Policies & Gates)

```bash
php artisan make:policy ProductPolicy --model=Product

```

Best practices:

-   Policies for domain rules
    
-   Controllers call `$this->authorize()`
    
-   No `if ($user->role === 'admin')` logic
    

✔ Cleaner  
✔ Safer  
✔ Scales with teams

----------

## 📦 Jobs, Events, Listeners (Scalable by Default)

```bash
php artisan make:job ProcessOrder
php artisan make:event OrderCreated
php artisan make:listener SendOrderEmail

```

Use these for:

-   Emails
    
-   Notifications
    
-   Background processing
    
-   Decoupled business logic
    

----------

## 🧪 Testing (Fast & Underrated)

```bash
php artisan make:test ProductTest
php artisan make:test ProductApiTest --unit

```

Recommended focus:

-   Feature tests for APIs
    
-   Unit tests for services
    
-   Avoid testing framework internals
    

----------

## 🛠 Debugging & Introspection

```bash
php artisan route:list
php artisan model:show Product
php artisan tinker
php artisan env

```

### `tinker` is powerful for:

-   Testing Eloquent queries
    
-   Debugging relationships
    
-   Trying auth & policies
    
-   Prototyping logic fast
    

----------

## ⚡ Performance & Production

```bash
php artisan optimize
php artisan config:cache
php artisan route:cache
php artisan view:cache

```

🚨 **Rule:**  
Only cache config/routes in **production**.

----------

## 🔥 Pro-Level Speed Tips

### 1️⃣ Always Stack Flags

```bash
php artisan make:model Order -mcrfs

```

### 2️⃣ Use Form Requests Early

Validation in controllers slows you down later.

### 3️⃣ Prefer Policies Over Role Checks

Authorization belongs in the domain layer.

### 4️⃣ Master One Auth Strategy

Don’t mix Sanctum + Sessions + JWT unless required.

----------

## 🧠 Architecture: Server-Driven + Client-Side Rendering

**Recommended Enterprise Pattern**

-   Laravel = source of truth
    
-   Controllers return JSON
    
-   React handles rendering & UX
    
-   Auth handled by Laravel sessions
    
-   No duplicated business logic
    

### Why This Works

-   Clear separation of concerns
    
-   Easier scaling
    
-   Better security
    
-   Faster onboarding for teams
    