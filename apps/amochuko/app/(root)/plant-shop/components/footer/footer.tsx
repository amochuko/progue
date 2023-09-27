import { Copyright } from '../copyright/copy-right';
import { Input } from '../input/input';
import './footer.scss';

interface Props {
  copyright: string;
}

export const Footer = (props: Props) => {
  return (
    <footer test-id='footer'>
      <div>
        <div>
          <div>
            <div>
              <h2>Newsletter</h2>
              <Input
                btnTitle='Subscribe'
                placeholderText='Enter email address'
              />
            </div>
            <div>
              <div>
                <div>
                  <div>
                    <h5>Contact</h5>
                    <p>First</p>
                    <p>figure</p>
                    <p>Year</p>
                  </div>
                  <div>
                    <p>Job</p>
                    <p>Month</p>
                    <p>fly year</p>
                    <p>Rockers</p>
                  </div>
                  <div>
                    <p>Profile</p>
                    <p>Week</p>
                    <p>fly second</p>
                    <p>third Rockers</p>
                  </div>
                  <div>
                    <p>Support</p>
                    <p>Road</p>
                    <p>Gift</p>
                    <p>yorkers Rockers</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='copyright'>
          <div>
            <div className='mb-4'>
              <hr />
            </div>
            <div>
              <Copyright copyright={props.copyright} />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
