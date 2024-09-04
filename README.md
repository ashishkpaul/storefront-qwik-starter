## Features

- Cart ✅
- Checkout flow ✅
- Search facet filters ✅
- Login ✅
- Account creation ✅
- Customer account management ✅
- SPA-mode navigation ✅
- Set up GraphQL code generation ✅
- Slider ✅
- Collections in slider ✅
- Related Products ✅
- Branding ✅
- Home page show products in collection ✅
- Theme, icons etc ✅
- Review
- Single Sign On (SSO)
- Multi-tanent Account Verification
- Wishlist

**Contributions welcome!**
SSL For Local Development

The error you're encountering indicates that the GraphQL Code Generator is failing to fetch the GraphQL schema from your Vendure server because the connection is secured with a self-signed SSL certificate. Since self-signed certificates are not trusted by default, the generator process is refusing to accept the connection.

### Solutions

Here are a few ways to resolve this issue:

#### 1. **Allow Insecure Connections for Code Generation**

You can configure the GraphQL Code Generator to accept self-signed certificates by adding the `NODE_TLS_REJECT_UNAUTHORIZED=0` environment variable before running the `pnpm generate` command.

**Example:**

```bash
NODE_TLS_REJECT_UNAUTHORIZED=0 pnpm generate
```

This will tell Node.js to ignore SSL certificate errors, including those from self-signed certificates. **Note**: This approach is generally not recommended for production use because it bypasses security checks.

#### 2. **Use the `--insecure` Flag in `graphql-codegen` (If supported)**

Some tools support an `--insecure` flag or similar to bypass SSL validation. However, this is specific to the tool you're using, so you should check the `graphql-codegen` documentation to see if it has such an option.

#### 3. **Trust the Self-Signed Certificate**

Instead of bypassing the SSL verification, you can make your system trust the self-signed certificate:

1.  **Export the Certificate**: Ensure your self-signed certificate (`nginx-selfsigned.crt`) is properly installed on your system.

2.  **Add to Node.js Trusted Certificates**:

    You can pass the certificate to Node.js so that it will trust your self-signed certificate.

    ```bash
    export NODE_EXTRA_CA_CERTS="/etc/ssl/certs/nginx-selfsigned.crt"
    ```

    Then, run the `pnpm generate` command:

    ```bash
    pnpm generate
    ```

#### 4. **Modify the `codegen-shop.ts` Configuration**

If possible, you can try modifying the `codegen-shop.ts` configuration to specify that the certificate should be trusted, but this depends on whether `graphql-codegen` supports this.

#### 5. **Use HTTP instead of HTTPS for Local Development**

If you're working in a development environment, you could switch to HTTP instead of HTTPS by adjusting your Nginx configuration. This would bypass the need for SSL certificates altogether.

**Nginx Configuration Example:**

```nginx
server {
    listen 80;
    server_name core.vendure.lan;

    location / {
        proxy_pass http://192.168.1.32:3001;
        # Other proxy settings
    }
}
```

### Choosing the Right Approach

- For **local development**, using `NODE_TLS_REJECT_UNAUTHORIZED=0` is quick and easy but not secure.
- For **production environments** or more secure setups, trusting the self-signed certificate or properly signing it (using a CA or Let's Encrypt) is recommended.

Let me know if you need further guidance on any of these steps!
