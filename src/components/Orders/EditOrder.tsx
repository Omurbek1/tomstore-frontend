import React, { useState } from "react";
import { useI18n } from "@/i18n/provider";
import toast from "react-hot-toast";

const EditOrder = ({ order, toggleModal }: any) => {
  const [currentStatus, setCurrentStatus] = useState(order?.status);
  const { t } = useI18n();
  const handleChanege = (e: any) => {
    setCurrentStatus(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (!currentStatus) {
      toast.error(t("order.selectStatus"));
      return;
    }

    toggleModal(false);
  };

  return (
    <div className="w-full px-10">
      <p className="pb-2 font-medium text-dark">{t("order.orderStatus")}</p>
      <div className="w-full">
        <select
          className="w-full rounded-[10px] border border-gray-3 bg-gray-1 text-dark py-3.5 px-5 text-custom-sm"
          name="status"
          id="status"
          required
          onChange={handleChanege}
        >
          <option value="processing">{t("order.status.processing")}</option>
          <option value="on-hold">{t("order.status.on-hold")}</option>
          <option value="delivered">{t("order.status.delivered")}</option>
          <option value="cancelled">{t("order.status.cancelled")}</option>
        </select>

        <button
          className="mt-5 w-full rounded-[10px] border border-blue-1 bg-blue-1 text-white py-3.5 px-5 text-custom-sm bg-blue"
          onClick={handleSubmit}
        >
          {t("common.saveChanges")}
        </button>
      </div>
    </div>
  );
};

export default EditOrder;
