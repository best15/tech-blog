module.exports = {
    format_date: (date) => {
        return date.toLocaleString("default", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    },
};
