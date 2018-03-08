const getters = {
  usersById(state){
    state.users.reduce((acc, el) => {
      acc[el.id] = el;
      return acc;
    },{})
  }
}

export { getters } 
