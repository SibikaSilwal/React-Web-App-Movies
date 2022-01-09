import { useEffect, useState } from "react";
import { VoidExpression } from "typescript";

export default function Pagination(props: paginationProps) {
  const [linkModels, setLinkModels] = useState<linkModel[]>([]);

  function selectPage(link: linkModel) {
    if (link.page === props.currentPage) return;

    if (!link.enabled) return;

    props.onChange(link.page);
  }

  function getClass(link: linkModel) {
    if (link.active) return "active pointer";
    if (!link.enabled) return "disabled";

    return "pointer";
  }
  useEffect(() => {
    const previousPageEnable = props.currentPage !== 1;
    const prevPage = props.currentPage - 1;
    const links: linkModel[] = [];

    links.push({
      text: "Previous",
      enabled: previousPageEnable,
      page: prevPage,
      active: false,
    });

    for (let i = 1; i <= props.totalAmountofPage; i++) {
      if (
        i >= props.currentPage - props.radio &&
        i <= props.currentPage + props.radio
      ) {
        links.push({
          text: `${i}`,
          enabled: true,
          page: i,
          active: props.currentPage === i,
        });
      }
    }

    const nextPageEnabled =
      props.currentPage !== props.totalAmountofPage &&
      props.totalAmountofPage > 0;
    const nextPage = props.currentPage + 1;
    links.push({
      text: `Next`,
      enabled: nextPageEnabled,
      page: nextPage,
      active: false,
    });

    setLinkModels(links);
  }, [props.currentPage, props.totalAmountofPage, props.radio]);
  return (
    <nav>
      <ul className="pagination justify-content-center">
        {linkModels.map((link) => (
          <li
            key={link.text}
            onClick={() => selectPage(link)}
            className={`page-item cursor ${getClass(link)}`}
          >
            <span className="page-link">{link.text}</span>
          </li>
        ))}
      </ul>
    </nav>
  );
}

interface linkModel {
  page: number;
  enabled: boolean;
  text: string;
  active: boolean;
}
interface paginationProps {
  currentPage: number;
  totalAmountofPage: number;
  radio: number;
  onChange(page: number): void;
}

Pagination.defaultProps = {
  radio: 3,
};
