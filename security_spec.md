# Security Specification: Narsingdi Fashion Firestore

## 1. Data Invariants
1. **Public Read-Only Catalog**: Anyone can view products (`/products/{productId}`) and store settings (`/settings/{settingId}`), but only authenticated administrators (`bn692352@gmail.com` with `email_verified == true` or `/admins/{uid}`) can create, update, reorder, pin, or delete products.
2. **Customer Order Integrity**: Customers can submit an order (`/orders/{orderId}`) with valid items, phone number, address, and positive amounts. Orders cannot be deleted or forged by random users, and order status transitions (e.g. `Shipped`, `Delivered`) are restricted to administrators.
3. **Review Quality & Approval**: Anyone can submit a review with valid rating (1-5) and comment, but `isApproved` cannot be forced to `true` by non-admins upon creation. Only administrators can approve reviews or post official store replies.
4. **Id Hardening**: Document IDs across all collections must be alphanumeric with dashes/underscores (`isValidId`), max 128 characters, preventing injection and path traversal.
5. **Admin Access Control**: Admin privileges strictly require `request.auth.token.email_verified == true` matching `bn692352@gmail.com` or presence in the `/admins/` collection.

---

## 2. The "Dirty Dozen" Malicious Payloads

1. **Payload 1: Unverified Admin Spoofing**
   - Attempt: Attacker signs up with `bn692352@gmail.com` but unverified email (`email_verified: false`) trying to update product price.
   - Result: PERMISSION_DENIED.

2. **Payload 2: Product Deletion by Unauthenticated User**
   - Attempt: Delete `/products/prod-jamdani-01` without admin credentials.
   - Result: PERMISSION_DENIED.

3. **Payload 3: Self-Approving Review Injection**
   - Attempt: Client posts review with `isApproved: true` or `isGoogleVerified: true` directly to bypass moderation.
   - Result: PERMISSION_DENIED.

4. **Payload 4: Negative Price Manipulation**
   - Attempt: Writing a product with `retailPrice: -500` or `stock: -10`.
   - Result: PERMISSION_DENIED.

5. **Payload 5: Massive String Buffer Overflow (Denial of Wallet)**
   - Attempt: Inserting an order address of 100,000 characters.
   - Result: PERMISSION_DENIED.

6. **Payload 6: Ghost Field Injection (Shadow Update)**
   - Attempt: Writing an order with ghost fields `__isAdmin: true` or malicious payload keys.
   - Result: PERMISSION_DENIED.

7. **Payload 7: Unauthorized Order Status Tampering**
   - Attempt: Non-admin updating order status from `Pending` directly to `Delivered`.
   - Result: PERMISSION_DENIED.

8. **Payload 8: Path Traversal / Poisoned Document ID**
   - Attempt: Creating a document with ID `../../secrets/dump` or invalid characters.
   - Result: PERMISSION_DENIED.

9. **Payload 9: Store Settings Hijacking**
   - Attempt: Updating `bkashNumber` or `nagadNumber` in `/settings/general` by non-admin.
   - Result: PERMISSION_DENIED.

10. **Payload 10: Deleting Order History**
    - Attempt: Calling delete on `/orders/order-12345` by unprivileged user.
    - Result: PERMISSION_DENIED.

11. **Payload 11: Admin Roster Self-Elevation**
    - Attempt: Non-admin writing a document into `/admins/{theirUid}`.
    - Result: PERMISSION_DENIED.

12. **Payload 12: Review Comment Length Attack**
    - Attempt: Submitting a review with 50,000 character comment payload.
    - Result: PERMISSION_DENIED.
