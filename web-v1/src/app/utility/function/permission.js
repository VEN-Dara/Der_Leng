function isTourGuideOrAbove() {
    const localUser = localStorage.getItem("user");
    if(localUser) {
        const user = JSON.parse(localUser);
        const { role } = user;
        if(role?.name === "tour_guide" || role?.name === "staff" || role?.name === "admin") {
            return true
        }
    }

    return false
}

export { isTourGuideOrAbove }