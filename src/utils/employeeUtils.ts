export function formatName(name: string){
  const names = name.split(' ');
  const length = names.length;

  const newNames = names.map((name, index) => {
    if(index === 0 || index === length -1)
      return name.toUpperCase();
    else if ( name.length >= 3)
      return name[0].toUpperCase();
  });

  return newNames.join(' ').replace(/\s+/g, ' ');
}
