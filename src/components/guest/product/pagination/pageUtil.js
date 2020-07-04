export default function pagination(count, current){
    let c = current > 0 ? current : 1,
        delta = 2,
        last = count,
        left = c - delta,
        right = c + delta + 1,
        temp = 0,
        range = [],
        rangeWithDots = [];

    for(let i = 1; i <= last; i++){
        if( i === 1 || i === last || (i >= left && i < right))   range.push(i);
    }

    for(let i of range){
        if(temp){
            if(i - temp === 2){
                rangeWithDots.push(temp+1);
            }else if(i - temp !== 1){
                rangeWithDots.push('...');
            }
        }
        rangeWithDots.push(i);
        temp = i;
    }

    return rangeWithDots;
}