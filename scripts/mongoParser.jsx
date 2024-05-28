export const dateFromTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString()
        .replace(/\//g, ' / ');
}