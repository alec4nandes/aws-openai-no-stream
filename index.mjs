import fetch from "node-fetch";

export const handler = async (event) => {
    const data = event.body ? JSON.parse(event.body) : event;
    return await fetcher(data);
};

async function fetcher(data) {
    data.stream = false;
    const { apiKeyName } = data;
    delete data.apiKeyName;
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env[apiKeyName]}`,
        },
        body: JSON.stringify(data),
    });
    return await response.json();
}
