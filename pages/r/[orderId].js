//order review form

import { useRouter } from "next/router";

import { getOrder } from "@/lib/db-admin";
import OrderReviewTemplate from "@/components/OrderReviewTemplate";
import DashboardSkeleton from "@/components/DashboardSkeleton";

export async function getServerSideProps(context) {
  // Fetch data from external API

  const orderId = context.params.orderId;

  const { order } = await getOrder(orderId);

  // Pass data to the page via props
  return { props: { order } };
}

export default function OrderFormReviewPage({ order }) {
  if (order) {
    return (
      <DashboardSkeleton>
        <OrderReviewTemplate order={order} />
      </DashboardSkeleton>
    );
  }

  return <h1>Loading</h1>;
}
