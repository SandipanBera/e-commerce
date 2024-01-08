import React from "react";
import Container from "../../container/container";
import { LuTrash2, LuPenSquare } from "react-icons/lu";
import { useSelector,useDispatch } from "react-redux";
import { address as adr, toastify } from "../../feature";
import { useNavigate, Link } from "react-router-dom";
import { deleteAddress } from "../../createSlice/Addressslice";
function Address() {
  const navigate = useNavigate();
  const data = useSelector((state) => state.address.addressData);
  const dispatch=useDispatch()

  return (
    data && (
      <Container>
        <section className="mx-auto w-full max-w-7xl px-4 py-4 ">
          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
            <div>
              <h2 className="text-lg font-semibold">Addresses</h2>
              <p className="mt-1 text-sm text-gray-700">
                This is a list of all addresses. You can add new addresses, edit
                or delete existing ones.
              </p>
            </div>
            <div>
              <button
                type="button"
                onClick={() => navigate("/address/create")}
                className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                Add new address
              </button>
            </div>
          </div>
          <div className="mt-6 flex flex-col">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                        >
                          <span>Address</span>
                        </th>
                        <th
                          scope="col"
                          className="px-12 py-3.5 text-left text-sm font-normal text-gray-700"
                        >
                          Details
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                        >
                          Created at
                        </th>
                        <th scope="col" className="px-4 py-3.5 text-left ">
                          <span className="sr-only">Delete</span>
                        </th>
                        <th scope="col" className="relative px-4 py-3.5">
                          <span className="sr-only">Edit</span>
                        </th>
                      </tr>
                    </thead>
                    {data?.addresses.length > 0 ? (
                      data?.addresses.map((address, index) => (
                        <tbody
                          key={address._id}
                          className="divide-y divide-gray-200 bg-white"
                        >
                          <tr>
                            <td className="whitespace-nowrap px-3 py-4">
                              <div className="flex items-center">
                                <div className="ml-2">
                                  <div className="text-sm font-medium text-gray-900">
                                    Address {index + 1}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className=" px-12 py-4">
                              <div className="text-sm text-gray-900 w-48 break-words">
                                {`${address.addressLine1} ${address.addressLine2} ${address.city} ${address.pincode} ${address.state}`}
                              </div>
                            </td>
                            <td className="whitespace-nowrap px-4 py-4">
                              <span className="inline-flex rounded-full  text-xs font-semibold leading-5 ">
                                {address.createdAt.slice(0, 10)}
                              </span>
                            </td>
                            <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">
                              <LuTrash2
                                size={20}
                                className="text-red-600"
                                onClick={() => {
                                  adr
                                    .deleteAddress(address._id)
                                    .then()
                                    .catch((error) => console.log(error));
                                  dispatch(deleteAddress(address._id))
                                  toastify.remove("address removed successfully")
                                }}
                              />
                            </td>
                            <td className="whitespace-nowrap px-4 py-4 text-right text-sm font-medium">
                              <Link to={`/address/edit/${address._id}`}>
                                {" "}
                                <LuPenSquare
                                  size={20}
                                  className="text-green-600"
                                />
                              </Link>
                            </td>
                          </tr>
                        </tbody>
                      ))
                    ) : (
                      <div>No address available</div>
                    )}
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Container>
    )
  );
}

export default Address;
