const MenuFunciones = ({ user }) => {
  return (
    <div className="grow flex flex-col mt-5 gap-4 text-start">
      <h4 className="text-3xl text-primary font-semibold">Menu</h4>
      <ul>
        <div className="flex items-start flex-col flex-wrap gap-2 text-sm font-semibold text-blue-600 max-h-[300px]">
          <a
            className="text-wrap dark:hover:text-primary-500 bg-primary/80  shadow-sm shadow-primary/20 text-white w-[300px] rounded-md px-2 py-1 hover:bg-primary"
            href="/"
          >
            Inicio
          </a>
          {user.rolFuncion.map((r, i) => (
            <a
              className="text-wrap dark:hover:text-primary-500 shadow-sm shadow-primary bg-primary/10 w-[300px] rounded-md px-2 py-1 hover:bg-primary hover:text-white"
              key={i}
              href={r.funcion.url}
            >
              {r.funcion.nombre}
            </a>
          ))}
        </div>
      </ul>
    </div>
  );
};

export default MenuFunciones;
