const { getVoucher } = require("@services/voucherService");

class voucherController {
    async checkVoucher(req, res) {
        const { voucherCode } = req.body;

        if (!voucherCode) {
            return res.json({ success: false, message: "Missing voucher code field", status: "MISSING_FIELD" });
        }

        const voucher = await getVoucher(voucherCode);

        if (!voucher.dataValues) {
            return res.json({ success: false, message: "The voucher could not be found", status: "NOT_FOUND" });
        }

        const currentDateTime = new Date();
        if (voucher.dataValues.valid_from > currentDateTime) {
            return res.json({ success: false, message: "The voucher has not started", status: "HAS_NOT_STARTED" });
        }

        if (voucher.dataValues.valid_to < currentDateTime) {
            return res.json({ success: false, message: "The voucher has ended", status: "HAS_ENDED" });
        }

        res.status(200).json({
            success: true,
            message: "The voucher has been successfully applied",
            voucher: voucher.dataValues,
            status: "APPLIED",
        });
    }
}

module.exports = new voucherController();
