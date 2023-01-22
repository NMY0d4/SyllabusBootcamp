const getDate = (option) => {
    const today = new Date();
    if (option === "day") {
        const options = {
            weekday: "long",
            day: "numeric",
            month: "long",
        };
        return today.toLocaleDateString("en-US", options);
    } else if (option === "today") {
        const options = {
            weekday: "long",
        };
        return today.toLocaleDateString("en-US", options);
    }
};

module.exports = { getDate };
