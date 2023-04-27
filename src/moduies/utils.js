function formatDateToLocalString(date){
    return date.toLocaleDateString();
}

function formatLocalDateStringToIsoString(date){
    const [day, month, year] = date.split('/');
    const newDate = new Date(`${year}-${month}-${day}`);
    return newDate.toISOString().slice(0,10);
}

export {formatDateToLocalString, formatLocalDateStringToIsoString}
