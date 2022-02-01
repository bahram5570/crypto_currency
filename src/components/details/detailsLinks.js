export const detailsLinks = (data) => {
  return data.map((x) => (
    <div key={x.url}>
      <p>{x.name}</p>
      <a href={x.url} target={"_blank"} rel="noopener noreferrer">
        {x.url.length > 20 ? x.url.slice(0, 20) + " ..." : x.url}
      </a>
    </div>
  ));
};
