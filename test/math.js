const math={
  add: (...args) => {
    return args.reduce((prev, curr) => {
      return prev + curr;
    })
  },
  mul: (...args) => {
    return args.reduce((prev, curr) => {
      return prev * curr;
    });
  }
};

function max(a,b) {
  if(a>b){
    return a;
  }else{
    return b;
  }
}

const a = 3;

const b=2;

module.exports = {max,math};
