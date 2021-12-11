import { nanoid } from 'nanoid'; //para numeros aleatorios
import React, { useState } from 'react';

//setTareas([...tareas, { id: nanoid(), NombreTarea: tarea }]);
//setTareas([...tareas, { id: nanoid(10), NombreTarea: tarea }]);

function App() {
    const [tarea, setTarea] = useState(''); //agregar tarea
    const [tareas, setTareas] = useState([]);
    const [modoEdicion, setModoEdicion] = useState(false); //va a pasar a verdadero
    const [id, setId] = useState('');
    const [error, setError] = useState(null);

    const agregarTarea = (e) => {
        console.log('esto es e:');
        console.log(tarea);
        e.preventDefault(); //evitamos que se procese el formulario con evento get

        if (!tarea.trim()) {
            console.log('elemento vacio');
            setError('Escriba algo');
            return;
        }

        //agregar tareas
        setTareas([...tareas, { id: nanoid(), nombreTarea: tarea }]);

        console.log(tarea);
        setTarea('');
        setError(null);
    };

    const eliminarTarea = (id) => {
        //el item es cada una de las tareas, en cada item preguntaremos si el id del item es distinto al id que mandamos, pero si el id que mandamos es igual al item entonces se excluye, lo que hacemos es filtrar el array y excluye a los item que hacemos click. si el id es igual al item.id el arrayfiltrado no lo va a incorporar
        const arrayFiltrado = tareas.filter((item) => item.id !== id);
        setTareas(arrayFiltrado);
        console.log(id);
    };

    const editar = (item) => {
        console.log(item);
        setModoEdicion(true);
        setTarea(item.nombreTarea); //pasamos la tarea al formulario de editar, propiedad del objeto
        setId(item.id); //guardar el id para utilizar en editar tarea
    };

    const editarTarea = (e) => {
        e.preventDefault();
        if (!tarea.trim()) {
            console.log('Elemento vacio');
            setError('Escriba algo');

            return;
        }
        // cuando item.id sea igual al id que esta en Edicion, entonces devolvemos el objeto editado que tendra el mismo id y la nueva tarea, en caso de que no sea igual solo devolvemos el item completo
        const arrayEditado = tareas.map((item) => (item.id === id ? { id, nombreTarea: tarea } : item));

        setTareas(arrayEditado);
        setModoEdicion(false);
        setTarea('');
        setId('');
        setError(null); //para eliminarlo
    };
    return (
        <div className='container mt-5'>
            <h1 className='text-center'>CRUD</h1>
            <hr />
            <div className='row'>
                <div className='col-8'>
                    <h4 className='text-center'>Lista de tareas</h4>
                    {/* --------------------------------------------------------------------------------- */}
                    {/* MOSTRANDO TAREAS */}
                    <ul className='list-group'>
                        {/* este elemento se va a ir repitiendo */}

                        {tareas.length === 0 ? (
                            <li className='list-group-item'>No hay tareas</li>
                        ) : (
                            tareas.map((item) => (
                                //id por la propiedad
                                <li className='list-group-item' key={item.id}>
                                    <span className='lead'>{item.nombreTarea}</span>
                                    {/* eliminar tarea */}
                                    <button className='btn btn-danger btn-sm float-end mx-2' onClick={() => eliminarTarea(item.id)}>
                                        Eliminar
                                    </button>
                                    {/* el item entero tendra el id y el nombre de la tarea */}
                                    <button className='btn btn-warning btn-sm float-end ' onClick={() => editar(item)}>
                                        Editar
                                    </button>
                                </li>
                            ))
                        )}
                    </ul>
                </div>
                {/*FORMULARIO  */}
                <div className='col-4'>
                    <h4 className='text-center'>
                        {
                            //cuando sea verdader mostraremos editar tarea, si esta en falso agregar tarea
                            modoEdicion ? 'Editar Tarea' : 'Agregar tarea'
                        }
                    </h4>
                    {/* si modoEdicion es verdadero  */}
                    <form onSubmit={modoEdicion ? editarTarea : agregarTarea}>
                        {/* cuando el error tenga algo mostramos lo que tenga, */}
                        {/*en caso de que tenga algo no muestranada */}
                        {error ? <span className='text-danger'>{error}</span> : null}
                        <input
                            type='text'
                            className='form-control mb-2'
                            placeholder='Ingrese tarea'
                            onChange={(e) => setTarea(e.target.value)} //relacion del input con el estado
                            value={tarea}
                        />
                        {/* modoEDICION verdader muestrame el boton editar, modo edicion falso muestrame le boton agregar */}
                        {modoEdicion ? (
                            <button className='btn btn-warning btn-block' type='submit'>
                                Editar
                            </button>
                        ) : (
                            <button className='btn btn-dark btn-block' type='submit'>
                                Agregar
                            </button>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
}

export default App;
