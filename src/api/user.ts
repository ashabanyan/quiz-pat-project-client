export const loginUser = async () => {
    const res = await fetch('http://localhost:3030/api/login/?login=test&password=123123')
    return res.ok
}