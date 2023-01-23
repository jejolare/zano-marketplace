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

export async function updateConfig(values) {
    const result = await fetch('/api/data/change-config', {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
            "Content-type": "application/json"
        }
    })
    .then(res => res.json());
    return result;
}

export async function uploadLogo(logo) {

    const data = new FormData();
    data.append('file', logo);

    const result = await fetch('/api/data/upload-logo', {
        method: "POST",
        body: data
    })
    .then(res => res.json());
    return result;
}

export async function updatePassword(value) {
    const result = await fetch('/api/auth/change-pass', {
        method: "POST",
        body: JSON.stringify({
            password: value
        }),
        headers: {
            "Content-type": "application/json"
        }
    })
    .then(res => res.json());
    return result;
}

export async function resetAll() {
    await fetch('/api/data/reset', {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        }
    })
    .then(res => res.json());
}

export function getLogo() {
    return '/api/data/get-logo';
}