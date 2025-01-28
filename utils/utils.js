function getToken()
{
    const token = localStorage.getItem('jwt');
    return token;
}