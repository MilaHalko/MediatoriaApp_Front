export const urlIsValid = async (URL) => {
    try {
        const res = await fetch(URL)
        return res.status >= 200 && res.status < 300
    } catch (e) {
        console.log(err)
        return false;
    }
}