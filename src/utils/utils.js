export async function isTemplatePrepared() {
    const result = await fetch('/api/auth/exists').then(res => res.json());
    if (!result?.success) {
        return true;
    }
    return result?.data;
}
export async function checkAuth() {
    const result = await fetch('/api/auth/is-admin', {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        }
    })
    .then(res => res.json());
    return result?.success && result.data;
}