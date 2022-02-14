import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { ReactElement } from "react-markdown/lib/react-markdown";
import { Link } from "react-router-dom";
import Button from "./Button";
import customConfirm from "./CustomConfirm";
import GenericList from "./GenericList";
import Pagination from "./Pagination";

export default function IndexEntity<T>(props: indexEntityProps<T>) {
  const [entities, setEntities] = useState<T[]>();

  const [totalAmountOfPages, setTotalAmountOfPages] = useState(0);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [page, setPage] = useState(1);

  useEffect(() => {
    loadData();
  }, [page, recordsPerPage]); // the empty array [] so that this function only executes once...

  function loadData() {
    axios
      .get(props.url, {
        params: { page, recordsPerPage },
      })
      .then((response: AxiosResponse<T[]>) => {
        const totalAmountofRecords = parseInt(
          response.headers["totalamountofrecords"],
          10
        );
        setTotalAmountOfPages(Math.ceil(totalAmountofRecords / recordsPerPage));
        setEntities(response.data);
      });
  }
  async function deleteEntity(id: number) {
    try {
      await axios.delete(`${props.url}/${id}`);
      loadData();
    } catch (error) {
      if (error && error.response) {
        console.log(error.response.data);
      }
    }
  }

  const buttons = (editURL: string, id: number) => (
    <>
      <Link className="btn btn-success" to={editURL}>
        Edit
      </Link>
      <Button
        className="btn btn-danger"
        onClick={() => customConfirm(() => deleteEntity(id))}
      >
        Delete
      </Button>
    </>
  );
  return (
    <>
      <h3>{props.title}</h3>
      <Link className="btn btn-primary" to={props.createURL}>
        {" "}
        Create {props.entityName}
      </Link>

      <Pagination
        currentPage={page}
        totalAmountofPage={totalAmountOfPages}
        onChange={(newPage) => setPage(newPage)}
      />

      <GenericList list={entities}>
        <table className="table table-striped">
          {props.children(entities!, buttons)}
        </table>
      </GenericList>
    </>
  );
}

interface indexEntityProps<T> {
  title: string;
  url: string;
  entityName: string;
  createURL: string;
  children(
    entities: T[],
    buttons: (editURL: string, id: number) => ReactElement
  ): ReactElement;
}
