export const parseJwt = () => {
    if (localStorage.getItem('user') == undefined || localStorage.getItem('user') == null) {
        return null
    }
    var token = localStorage.getItem('user').split('.');
    var base64Url = token[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(window.atob(base64));
}