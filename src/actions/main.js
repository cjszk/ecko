export const GET_LOCATION = 'GET_LOCATION';
export const getLocation = (location) => {
    return ({
        type: GET_LOCATION,
        location
    })
} 