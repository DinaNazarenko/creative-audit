export const formatOptions = options => {
  return options.map(option => 
    `${option.titleComment} ${option.comment}`
).join('\n');
};
