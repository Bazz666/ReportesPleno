reportpleno.factory('httpService', ($http) => {
    return{
        authWithinCredentials(){
            return $http.get('/api/authGuest');
        },
        get_level(config){
            return $http.get('/api/level', config);
        },
        get_level_all(config){
            return $http.get('/api/level/all', config);
        },
        get_config_level(config){
            return $http.get('/api/level/config', config);
        },
        post_save_or_update_level(data, config){
            return $http.post('/api/level',data, config)
        },
        put_change_status_level(config){
            return $http.put('/api/level', {}, config);
        },
        delete_level(config){
            return $http.delete('/api/level', config);
        },
        post_add_or_update(data, config){
            return $http.post('/api/conflevel', data, { headers: config });
        },
        delete_config_level(config){
            return $http.delete('/api/conflevel',config);
        },
        login_user(config){
            return $http.get('/api/login', config);
        },
        get_subject(){
            return $http.get('/api/getSubject');
        },
        get_score_subject(subjectCode){
            return $http.get('/api/getScoreSubject?codeSubject=' + subjectCode);
        },
        get_all_subject_score(){
            return $http.get('/api/getAllScoreSubject');
        }
    }
});
reportpleno.factory("auth", function($location)
{
    const private_routes = ['/admin','/config_asignatura','/configdemre','/config_demre_masivo'];
    return{
        checkStatus : async function()
        {

            let privateRoute = private_routes.some( element  => element == $location.path());

            if(privateRoute){
                //Validamos si existe un token y es valido
                const token = localStorage.getItem('token');

                const validaToken = await validateToken(token);
                
                if(validaToken == 200){
                    $location.path();
                }else{
                    $location.path('/');
                }
            }

            // if($location.path() == "/login"){hsjhjsdhfjhsfjhslkfjiskjn kbs jsv jsvbsodbvnds  sov ds vosd dsbngbnsds josdoso dj df ds vhjds ov sdvb sdp sos ñsvosd vfds ovj 
            //     $location.path('/login')
            // }

            
        }
    }
});

reportpleno.run(function($rootScope, auth)
{
    //al cambiar de rutas
    $rootScope.$on('$routeChangeStart', function()
    {
        //llamamos a checkStatus, el cual lo hemos definido en la factoria auth
        //la cuál hemos inyectado en la acción run de la aplicación
        auth.checkStatus();
    })
})

function validateToken(token) {

    const data = { token }
    return fetch('/api/validate_token', {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers:{
          'Content-Type': 'application/json'
        }
      })
      .then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(response => response.status);
}