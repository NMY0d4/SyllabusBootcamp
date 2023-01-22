const getDate = (option) => {
    const today = new Date();
    if (option === "day") {
        const options = {
            weekday: "long",
            day: "numeric",
            month: "long",
        };
        return today.toLocaleDateString("fr-FR", options);
    } else if (option === "today") {
        const options = {
            weekday: "long",
        };
        return today.toLocaleDateString("fr-FR", options);
    }
};

module.exports = { getDate };
