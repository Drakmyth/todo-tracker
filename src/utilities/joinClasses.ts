const joinClasses = (classes: string, optionalClasses: string = "") => {
    return `${classes} ${optionalClasses}`.trim()
};

export default joinClasses;