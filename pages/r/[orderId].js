//order review form

import { useRouter } from "next/router";

import { getOrder, getAllOrders } from "@/lib/db-admin";
import OrderReviewTemplate from "@/components/OrderReviewTemplate";
import DashboardSkeleton from "@/components/DashboardSkeleton";

export async function getStaticProps(context) {
  const orderId = context.params.orderId;
  const { order } = await getOrder(orderId);

  return {
    props: {
      orderInfo: order,
    },
    revalidate: 1,
  };
}

export async function getStaticPaths() {
  const { orders } = await getAllOrders();

  const paths = orders.map((order) => ({
    params: {
      orderId: order.id.toString(),
    },
  }));

  return {
    paths,
    fallback: true,
  };
}

export default function OrderFormReviewPage({ orderInfo }) {
  if (orderInfo) {
    return (
      <DashboardSkeleton>
        <OrderReviewTemplate order={orderInfo} />
      </DashboardSkeleton>
    );
  }

  return <h1>Loading</h1>;
}
