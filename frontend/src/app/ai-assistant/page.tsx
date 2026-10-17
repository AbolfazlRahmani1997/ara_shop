import type { Metadata } from "next";
import { AssistantWizard } from "@/components/AssistantWizard";

export const metadata: Metadata = {
  title: "دستیار زیبایی",
  description:
    "مشاوره رایگان زیبایی آرا برای پیشنهاد محصول متناسب با نوع پوست و بودجه.",
};

export default function AIAssistantPage() {
  return <AssistantWizard />;
}
