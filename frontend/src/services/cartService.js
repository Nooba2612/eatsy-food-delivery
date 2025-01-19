import axiosInstance from "@config/axiosInstance";

const getCartItems = async () => {
    try {
        const res = await axiosInstance({
            url: "/api/cart",
            method: "GET",
        });

        return res.data;
    } catch (error) {
        console.log("Failed to get cart items ", error);
    }
};

export { getCartItems };
