
/**
 * @dev A logger middleware for redux `store` activies
 * @param store 
 * @returns 
 */
const logger = (store:any) => (next:any) => (action:any) => {
  console.group(action.type);
  console.info('dispatching', action);

  let result = next(action);
  console.log('next state', store.getState());

  return result;
};

export default logger;
