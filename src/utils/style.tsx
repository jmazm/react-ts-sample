export const getTransformData = (el: HTMLElement) => {
    let matrix: any = window.getComputedStyle(el).transform;
    let data: any = {
      translateX: 0,
      translateY: 0,
      scaleX: 0,
      scaleY: 0
    };
    if (matrix) {
      matrix = matrix.replace('matrix(', '').replace(')', '').split(',');
  
      if (matrix.length > 2) {
        const [scaleX, rotateX, rotateY, scaleY, translateX, translateY] = matrix;
        data = {
          ...data,
          translateX: parseFloat(translateX),
          translateY: parseFloat(translateY),
          scaleX: parseFloat(scaleX),
          scaleY: parseFloat(scaleY),
          rotateX: parseFloat(rotateX), 
          rotateY: parseFloat(rotateY)
        };
      }
    }
  
    return data;
};
  