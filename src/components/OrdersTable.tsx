import { Order } from "../types";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { NotFound } from "../assets/icons";

interface OrdersTableProps {
  orders: Order[];
  hasNextPage: boolean;
  fetchNextPage: () => void;
}

export function OrdersTable({ orders, hasNextPage, fetchNextPage }: OrdersTableProps) {
  const handleDelete = (id: string) => {
    alert(`Hapus order dengan ID: ${id}`);
  };

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [fetchNextPage, inView]);

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg bg-gray-800" style={{ maxHeight: "674px", overflowY: "auto", scrollbarColor: "#4B5563 #1F2937" }}>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 sticky top-0">
            <tr>
              <th scope="col" className="px-6 py-3">
                Do/No
              </th>
              <th scope="col" className="px-6 py-3">
                Goods
              </th>
              <th scope="col" className="px-6 py-3">
                Origin
              </th>
              <th scope="col" className="px-6 py-3">
                Destination
              </th>
              <th scope="col" className="px-6 py-3">
                Address
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr
                  key={order.do_id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    <div className="flex items-center gap-2">
                      {order.do_no}
                      <div className="relative group">
                        <button
                          className="px-3 py-1 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                          type="button"
                        >
                          Kelola
                        </button>
                        <div className="absolute z-10 group-hover:visible opacity-0 group-hover:opacity-100 transition-opacity duration-300 left-full top-1/2 -translate-y-1/2 ml-2">
                          <div className="bg-white dark:bg-gray-800 p-2 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
                            <button
                              onClick={() => handleDelete(order.do_id)}
                              className="p-2 text-gray-500 hover:text-red-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {order.goods_name}
                  </td>
                  <td className="px-6 py-4">
                    {order.origin_name}
                  </td>
                  <td className="px-6 py-4">
                    {order.destination_name}
                  </td>
                  <td className="px-6 py-4">
                    {order.destination_address.length > 30 ? (
                      <div className="relative group">
                        <span>{order.destination_address.substring(0, 30) + '...'}</span>
                        <div className="absolute z-10 invisible group-hover:visible inline-block px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 group-hover:opacity-100 -translate-y-1 transition-all duration-300 dark:bg-gray-700 bottom-full left-1/2 -translate-x-1/2 mb-2 min-w-max">
                          {order.destination_address}
                          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full w-2 h-2 bg-gray-900 dark:bg-gray-700 rotate-45"></div>
                        </div>
                      </div>
                    ) : (
                      order.destination_address
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-8 dark:bg-gray-800">
                  <div className="flex flex-col items-center">
                    <NotFound
                      width={128}
                      height={128}
                      className="mb-4 opacity-50"
                    />
                    <p className="text-gray-400 text-lg">
                      Data tidak ditemukan
                    </p>
                  </div>
                </td>
              </tr>
            )}

            {hasNextPage && (
              <tr ref={ref}>
                <td colSpan={5} className="text-center py-4 dark:bg-gray-800">
                  <div role="status">
                    <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                    <span className="sr-only">Loading...</span>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
