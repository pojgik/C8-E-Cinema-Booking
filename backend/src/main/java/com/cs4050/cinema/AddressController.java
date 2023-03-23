// package com.cs4050.cinema;

// import java.util.List;

// import javax.security.sasl.AuthenticationException;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.HttpStatus;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.CrossOrigin;
// import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.PathVariable;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.PutMapping;
// import org.springframework.web.bind.annotation.RequestBody;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RequestParam;
// import org.springframework.web.bind.annotation.RestController;

// @RestController
// @RequestMapping("/address")
// @CrossOrigin
// public class AddressController {

//     @Autowired
//     private AddressRepository addressRepository;

//     @PostMapping("/")
//     public ResponseEntity<Address> createAddress(@RequestBody Address address) {
//         Address savedAddress = addressRepository.save(address);
//         return new ResponseEntity<Address>(savedAddress, HttpStatus.CREATED);
//     }
// }

