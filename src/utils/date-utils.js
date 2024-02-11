export default function getFormattedDate(value=0, type='date', inMS=true,locale='en-US') {
  if(!type) return value;
    if(!inMS) {
      value=value*1000;
    }
    const date = new Date(value);
    let options={};
    if(type=="date"){
        options={
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }
    }
    else if(type=="time"){
      options={
        hour: '2-digit',
        minute: '2-digit'
      }
    }
    return Intl.DateTimeFormat(locale, options).format(date);
}