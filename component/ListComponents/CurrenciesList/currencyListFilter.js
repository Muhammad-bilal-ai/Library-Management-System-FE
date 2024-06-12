import { Formik, Form } from "formik";
import { Stack, Button } from "@mui/material";
import fetchcurrencyFilteredData from "./currencyFilteredData";
import FiltersControls from "../../Filters/FiltersControls";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import fetchCurrencyFilteredData from "./currencyFilteredData";

function CurrencyFilters(props) {
  const { searchParams, setPagedata, router, setCurrentPage } = props;
  const initialValues = {
    search: searchParams?.get("search")?.toString() || "",
    order: searchParams?.get("order")?.toString() || "",
    orderBy: searchParams?.get("orderBy")?.toString() || "",
  };
  const handleReset = {
    search: "",
    order: "",
  };
  const handleSubmit = async (data) => {
    const filteredData = await fetchCurrencyFilteredData(
      data,
      searchParams,
      router.replace
    );
    setPagedata(filteredData);
    setCurrentPage(1);
  };
  const orderByArray = [{ name: "Name" }];
  return (
    <>
      <h1 className="text-center text-sky-700 pb-4 font-bold text-2xl">
        Currency List
      </h1>
      <div className="p-4 flex justify-center">
        <Accordion className="w-full  md:w-[800px] lg:w-[1000px] ">
          <AccordionSummary
            expandIcon={<ArrowDropDownIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className="font-bold text-lg ">Filter</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
              {(formProps) => (
                <Form className="mb-12">
                  <Stack spacing={1} alignSelf={"center"}>
                    <Stack
                      direction={"row"}
                      width="100%"
                      alignSelf={"center"}
                      spacing={10}
                    >
                      <FiltersControls
                        id="outlined-basic"
                        variant="outlined"
                        control="search"
                        name="search"
                        label="Search"
                      />
                      <FiltersControls
                        control="select"
                        name="orderBy"
                        label="Order By"
                        labelId="orderByLabel"
                        options={orderByArray}
                      />
                    </Stack>
                    <Stack direction={"row"} spacing={1} width="46%">
                      <FiltersControls control="order" />
                    </Stack>
                    <Stack
                      direction={"row"}
                      spacing={2}
                      className="flex justify-end px-32"
                    >
                      <Button
                        size="small"
                        variant="contained"
                        className="text-white bg-slate-600 hover:bg-slate-700 focus:ring-4 focus:ring-slate-200 transition duration-300 ease-in-out transform hover:scale-110 font-bold rounded-lg text-sm px-5 py-2.5 text-center m-2"
                        onClick={() => formProps.setValues(handleReset)}
                        type="submit"
                      >
                        RESET
                      </Button>
                      <Button
                        size="small"
                        variant="contained"
                        className="text-white  bg-sky-700 hover:bg-sky-800 focus:ring-4 focus:ring-sky-200 font-bold transition duration-300 ease-in-out transform hover:scale-110 rounded-lg text-sm px-5 py-2.5 text-center w-24"
                        type="submit"
                      >
                        Apply
                      </Button>
                    </Stack>
                  </Stack>
                </Form>
              )}
            </Formik>
            <Stack spacing={2} direction={"row"}></Stack>
          </AccordionDetails>
        </Accordion>
      </div>
    </>
  );
}
export default CurrencyFilters;
