//this function will convert the createdAT to the format Month Year
export function formatMemberSince(dateString){
    const date = new Date(dateString);
    const month = date.toLocaleString("default", {month:"short"});
    const year = date.getFullYear();
    return `${month} ${year}`;
}

//this function will convert the createdAT to the format Month Year
export function formatCreatedAt(dateString){
    const date = new Date(dateString);
    const month = date.toLocaleString("default", {month:"long"});
    const day =date.getDate();
    const year = date.getFullYear();
    return `${month} ${day} ${year}`;
}