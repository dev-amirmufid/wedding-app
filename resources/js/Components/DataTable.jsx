import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { router } from "@inertiajs/react";
import {
    Card,
    CardHeader,
    Input,
    Typography,
    Button,
    CardBody,
    CardFooter,
} from "@material-tailwind/react";
import { useState } from "react";

const DataTable = ({
    title,
    subtitle,
    addButton,
    filterSearch,
    pagination,
    columns,
    data,
    filters,
    onChangeFilter,
    filterOptions,
    filterOptionsComponent,
}) => {
    const [search, setSearch] = useState(filters?.search || "");

    const handleSearch = () => {
        filters.current_page = 1;
        filters.search = search;
        onChangeFilter(filters);
    };

    const handlePaging = (page) => {
        if (page > 0) {
            filters.current_page = page;
            onChangeFilter(filters);
        }
    };

    return (
        <Card className="h-full w-full p-4">
            <CardHeader floated={false} shadow={false} className="rounded-none">
                <div className="mb-8 flex items-center justify-between gap-8">
                    <div>
                        {title && (
                            <Typography variant="h5" color="gray">
                                {title}
                            </Typography>
                        )}
                        {subtitle && (
                            <Typography
                                color="gray"
                                className="mt-1 font-normal"
                            >
                                {subtitle}
                            </Typography>
                        )}
                    </div>
                    <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                        {addButton}
                    </div>
                </div>
            </CardHeader>
            <CardBody className="overflow-scroll px-0">
                <div className="grid grid-cols-2 content-between gap-4 md:flex-row">
                    <div className="flex justify-between gap-2">
                        {filterOptions && filterOptionsComponent}
                    </div>
                    {filterSearch && (
                        <div className="flex justify-end">
                            <div className="relative w-full max-w-[24rem] md:w-72">
                                <Input
                                    type="text"
                                    label="Search"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="pr-20"
                                    containerProps={{
                                        className: "min-w-0",
                                    }}
                                />
                                <Button
                                    onClick={handleSearch}
                                    size="sm"
                                    color={"blue"}
                                    className="!absolute right-1 top-1 rounded flex items-center gap-3"
                                >
                                    <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
                                    Search
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
                <table className="mt-4 w-full min-w-max table-auto text-left">
                    <thead>
                        <tr>
                            {columns?.map((head) => (
                                <th
                                    key={head.name}
                                    className={`border-y border-gray-100 bg-gray-50/50 p-4 ${
                                        head?.center ? "text-center" : ""
                                    }`}
                                    style={{ width: ` ${head?.width || ""}` }}
                                >
                                    <Typography
                                        variant="small"
                                        color="gray"
                                        className="font-normal leading-none opacity-70"
                                    >
                                        {head.name}
                                    </Typography>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data?.length ? (
                            data?.map((row, index) => {
                                const isLast = index === data.length - 1;
                                const classes = isLast
                                    ? "p-4"
                                    : "p-4 border-b border-gray-50";

                                return (
                                    <tr key={`row-${index}`}>
                                        {columns?.map((item, colindex) => (
                                            <td
                                                key={`col-${colindex}`}
                                                className={`${classes} ${
                                                    item?.center
                                                        ? "text-center"
                                                        : ""
                                                }`}
                                                style={{
                                                    width: ` ${
                                                        item?.width || ""
                                                    }`,
                                                }}
                                            >
                                                {item?.cell
                                                    ? item?.cell(row, index)
                                                    : item?.selector
                                                    ? item?.selector(row)
                                                    : ""}
                                            </td>
                                        ))}
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td
                                    colSpan={columns?.length}
                                    className={`p-4 text-center`}
                                >
                                    Tidak ada data
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </CardBody>

            {pagination && (
                <CardFooter className="flex items-center justify-between border-t border-gray-50 p-4">
                    <Typography
                        variant="small"
                        color="gray"
                        className="font-normal"
                    >
                        Page {pagination.currentPages} of{" "}
                        {pagination?.totalPages}
                    </Typography>
                    <div className="flex gap-2">
                        <Button
                            disabled={!pagination.prevPageUrl}
                            onClick={() =>
                                handlePaging(pagination.currentPages - 1)
                            }
                            variant="outlined"
                            color="gray"
                            size="sm"
                        >
                            Previous
                        </Button>
                        <Button
                            disabled={!pagination.nextPageUrl}
                            onClick={() =>
                                handlePaging(pagination.currentPages + 1)
                            }
                            variant="outlined"
                            color="gray"
                            size="sm"
                        >
                            Next
                        </Button>
                    </div>
                </CardFooter>
            )}
        </Card>
    );
};

export default DataTable;
